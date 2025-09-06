"use client";
import { Button } from "@/components/ui/button";

export default function LoginPromptModal({ open, onClose, onLogin }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Bạn cần đăng nhập</h2>
        <p className="text-sm text-gray-600 mb-6">Vui lòng đăng nhập để tiếp tục.</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Đóng</Button>
          <Button onClick={onLogin}>Đăng nhập</Button>
        </div>
      </div>
    </div>
  );
}