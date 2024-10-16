'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function MBentoUI() {
    const router = useRouter();
    return (
        <div onClick={() => {
            router.push('/test');
        }} style={{ color: '#fff', fontSize: '6rem', cursor: 'pointer' }}>Mobile BentoUI</div>
    );
}