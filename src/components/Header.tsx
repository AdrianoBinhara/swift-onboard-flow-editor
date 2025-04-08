
import { ArrowLeft, Code, Maximize2, Settings, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

interface HeaderProps {
  flowName: string;
  onFlowNameChange: (name: string) => void;
  onPublish: () => void;
  onCodeClick?: () => void;
}

export function Header({ flowName, onFlowNameChange, onPublish, onCodeClick }: HeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(flowName);

  const handleSave = () => {
    onFlowNameChange(nameValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setNameValue(flowName);
      setIsEditing(false);
    }
  };

  return (
    <header className="h-14 border-b border-border flex items-center px-4 justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        {isEditing ? (
          <Input
            className="h-9 max-w-64"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h1 
            className="text-lg font-medium cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsEditing(true)}
          >
            {flowName}
          </h1>
        )}
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon">
          <Maximize2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onCodeClick}>
          <Code className="h-5 w-5" />
        </Button>
        <Button className="ml-2" onClick={onPublish}>
          <Share2 className="h-4 w-4 mr-2" />
          Publish
        </Button>
      </div>
    </header>
  );
}
