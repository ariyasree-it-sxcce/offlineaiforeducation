import React from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="phone-frame">
        <div className="phone-screen flex flex-col">
          {/* Phone notch */}
          <div className="phone-notch" />
          
          {/* Status bar */}
          <div className="status-bar">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <Battery className="w-5 h-5" />
            </div>
          </div>

          {/* Screen content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
