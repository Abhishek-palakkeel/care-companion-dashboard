
-- Create fall_events table
CREATE TABLE public.fall_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_update_id BIGINT UNIQUE,
  chat_id BIGINT,
  message_text TEXT,
  image_url TEXT,
  confirmed BOOLEAN NOT NULL DEFAULT false,
  dismissed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fall_events ENABLE ROW LEVEL SECURITY;

-- Allow public read (this is a kiosk/dashboard app, no user auth)
CREATE POLICY "Anyone can read fall events"
ON public.fall_events FOR SELECT USING (true);

-- Allow public update for confirm/dismiss
CREATE POLICY "Anyone can update fall events"
ON public.fall_events FOR UPDATE USING (true);

-- Service role inserts via edge function (no policy needed for service role)

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.fall_events;

-- Create storage bucket for fall images
INSERT INTO storage.buckets (id, name, public) VALUES ('fall-images', 'fall-images', true);

CREATE POLICY "Public read fall images"
ON storage.objects FOR SELECT
USING (bucket_id = 'fall-images');

CREATE POLICY "Service role can upload fall images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'fall-images');
