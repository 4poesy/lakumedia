-- Phase 3 Migration: Multimedia Vertical Extensions

-- Add is_featured column to media_items for hero spotlight items
ALTER TABLE media_items 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE NOT NULL;
