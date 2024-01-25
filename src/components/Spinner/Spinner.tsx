import "./spinner.css";

export const Spinner = ({ size = 4, color = "#0f0f0f", weight = 4 }) => {
    const strokeWidth = `${weight}`;

    return (
        <div
            className={`spinner-loader`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <svg viewBox="25 25 50 50" className="spinner">
                <circle
                    className="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth={strokeWidth}
                    strokeMiterlimit="10"
                    style={{
                        stroke: color,
                    }}
                />
            </svg>
        </div>
    );
};
