
//Main Page Component
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from './loading';
import { useRouter } from 'next/navigation';
import MainUI from './components/MainUI';



function Index() {
  return (
    <>
      <MainUI />
    </>
  );
}

export default Index;
