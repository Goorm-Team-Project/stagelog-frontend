import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

export default function CoverImageUploader({
  value,
  onChange,
}: {
  value: File | null
  onChange: (file: File | null) => void
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        대표 이미지 <span className="text-gray-400">(선택)</span>
      </label>

      <label
        className={`
          flex flex-col items-center justify-center
          rounded-xl border-2 border-dashed
          px-6 py-10 text-sm cursor-pointer
          transition
          ${value
            ? 'border-gray-300 hover:border-pink-400'
            : 'border-gray-300 text-gray-400 hover:border-pink-400'}
        `}
      >
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onChange(file)
          }}
        />

        {!value ? (
          <>
            <AddPhotoAlternateIcon fontSize="large" />
            <span className="mt-2">
              클릭하여 대표 이미지 추가
            </span>
          </>
        ) : (
          <img
            src={URL.createObjectURL(value)}
            alt="대표 이미지 미리보기"
            className="max-h-[240px] rounded-lg object-cover"
          />
        )}
      </label>
    </div>
  )
}
