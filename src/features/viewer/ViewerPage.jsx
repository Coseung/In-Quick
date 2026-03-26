import React from 'react';
import { useInvitationStore } from '../invitation';
import Viewer from './Viewer';

export default function ViewerPage() {
  const data = useInvitationStore(state => state.data);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Viewer data={data} mode="viewer" />
    </div>
  );
}
