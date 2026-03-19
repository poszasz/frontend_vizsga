export default function Button({ content, color, onClick, style }) {
    return (
        <button
            className={`btn btn-${color}`}
            onClick={onClick}
            style={style}
        >
            {content}
        </button>
    )
}