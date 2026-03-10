import { Portal } from './Portal';
import '../styles/ConfirmationModal.css';

export const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="confirmation-modal-overlay">
        <div className="confirmation-modal">
          <h2 className="confirmation-modal-title">{title}</h2>
          <p className="confirmation-modal-message">{message}</p>
          <div className="confirmation-modal-actions">
            <button className="confirmation-modal-btn cancel-btn" onClick={onCancel}>
              {cancelText}
            </button>
            <button className="confirmation-modal-btn confirm-btn" onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
