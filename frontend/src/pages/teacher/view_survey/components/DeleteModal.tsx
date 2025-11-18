import Modal from 'react-modal'

export const DeleteModal = ({ isOpen, onClose, onDelete }: any) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        className="bg-white rounded-lg p-6 w-100 h-50 mx-auto flex flex-col">
        <h2 className="text-md flex-1">Are you sure you want to delete <span className="font-semibold">this</span>?</h2>
        <div className="flex justify-end gap-x-5">
        <button className="py-2 px-5 bg-[#cdcdcd]" onClick={onClose}>Cancel</button>
        <button className="py-2 px-5 bg-[#DC0202] text-white" onClick={onDelete}>Yes, Delete</button>
        </div>  
    </Modal>
  )
}