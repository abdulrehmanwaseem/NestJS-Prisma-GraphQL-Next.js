"use client";

import { Copy, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeData: string;
}

export default function TwoFactorModal({
  isOpen,
  onClose,
  qrCodeData,
}: TwoFactorModalProps) {
  const [backupCode] = useState("XXXX-XXXX-XXXX-XXXX");
  const [showCopied, setShowCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(backupCode);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Two-Factor Authentication
        </h2>
        <p className="text-gray-600 mb-6">
          Scan this QR code with your authenticator app to enable two-factor
          authentication.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-6 flex justify-center">
          <Image
            src={qrCodeData || "/placeholder.svg"}
            alt="2FA QR Code"
            width={192} // 48 * 4
            height={192} // 48 * 4
            className="w-48 h-48"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Backup Codes
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            Save these backup codes in a secure place. You can use them to sign
            in if you lose access to your authenticator app.
          </p>
          <div className="bg-white rounded border border-blue-200 p-3 flex justify-between items-center">
            <code className="text-sm text-blue-900 font-mono">
              {backupCode}
            </code>
            <button
              onClick={handleCopyCode}
              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors relative group"
            >
              <Copy className="h-4 w-4" />
              {showCopied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
