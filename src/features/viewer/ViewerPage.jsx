import React from 'react';
import InvitationPreview from '../../shared/components/InvitationPreview';

export default function ViewerPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <InvitationPreview mode="viewer" />
    </div>
  );
}
