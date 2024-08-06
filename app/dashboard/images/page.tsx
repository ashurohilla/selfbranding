"use client"
import React, { useEffect, useState } from 'react';
import { listallimages } from '@/lib/actions/blog';
import { Copy } from 'lucide-react';
import Image from 'next/image';

const Page: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageList = await listallimages();
        // Filter out any non-image files if necessary
        const imageUrls = imageList
          .filter((image: any) => image.metadata.mimetype.startsWith('image/'))
          .map((image: any) => `${url}/storage/v1/object/public/images/uploads/${image.name}`);
        setImages(imageUrls);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    fetchImages();
  }, []);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Copied to clipboard!');
    }).catch((err) => {
      console.error('Could not copy text:', err);
    });
  };

  return (
    <div>
      <h1>Images</h1>
      <div>
        {images.map((url, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

<Image
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                // placeholder="blur"
                src={url}
                alt={`Image ${index}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />

<button onClick={() => copyToClipboard(url)} style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <Copy size={16} />
              <span style={{ marginLeft: '5px' }}>Copy URL</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
