export default function TextBox({ type, placeholder, value, setValue, inputStyle, placeholderStyle }) {
    return (
        <div className="mb-3">
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={inputStyle}
            />
        </div>
    )
}