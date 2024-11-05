const UploadSection = ({ onFileUpload }) => {
    return (
        <div className="mb-4">
            <label className="block text-white mb-2">Upload Image of Problem</label>
            <input
                type="file"
                onChange={onFileUpload}
                accept="image/*"
                className="w-full text-white"
            />
        </div>
    );
};

export default UploadSection; 