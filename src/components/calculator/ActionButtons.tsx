
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, PhoneCall } from "lucide-react";

interface ActionButtonsProps {
  onDownload: () => void;
  onScheduleCall: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDownload, onScheduleCall }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        onClick={onDownload} 
        variant="outline" 
        className="flex-1 border-reactor-light-grey bg-[#DDDDDD] hover:bg-reactor-light-grey"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Report
      </Button>
      <Button 
        onClick={onScheduleCall}
        className="flex-1 bg-[#FFCC00] hover:bg-[#FFD633] text-reactor-brand-black"
      >
        <PhoneCall className="mr-2 h-4 w-4" />
        Schedule a Call
      </Button>
    </div>
  );
};

export default ActionButtons;
