import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN not configured');
    return new Response('Server error', { status: 500 });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const update = await req.json();
    console.log('Received Telegram update:', JSON.stringify(update));

    const message = update.message ?? update.edited_message;
    if (!message) {
      return new Response(JSON.stringify({ ok: true, ignored: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const chatId = message.chat?.id;
    const text = message.text || message.caption || '';
    let imageUrl: string | null = null;

    // Check if message has a photo
    if (message.photo && message.photo.length > 0) {
      // Get the largest photo
      const photo = message.photo[message.photo.length - 1];
      const fileId = photo.file_id;

      // Get file path from Telegram
      const fileRes = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
      );
      const fileData = await fileRes.json();

      if (fileData.ok && fileData.result.file_path) {
        const filePath = fileData.result.file_path;
        
        // Download the file
        const downloadRes = await fetch(
          `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`
        );
        const fileBytes = await downloadRes.arrayBuffer();
        const uint8 = new Uint8Array(fileBytes);

        // Upload to storage
        const fileName = `fall_${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('fall-images')
          .upload(fileName, uint8, { contentType: 'image/jpeg' });

        if (uploadError) {
          console.error('Upload error:', uploadError);
        } else {
          const { data: urlData } = supabase.storage
            .from('fall-images')
            .getPublicUrl(fileName);
          imageUrl = urlData.publicUrl;
          console.log('Image uploaded:', imageUrl);
        }
      }
    }

    // Insert fall event
    const { error: insertError } = await supabase.from('fall_events').upsert({
      telegram_update_id: update.update_id,
      chat_id: chatId,
      message_text: text,
      image_url: imageUrl,
    }, { onConflict: 'telegram_update_id' });

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
