import { Textfit } from "react-textfit";

const Screen = ({ value }) => {
    return (
        <div className="screen">
            <Textfit
                mode="single"
                max={12}
                style={{
                    color: "#fff",
                    fontSize: "24px",
                    fontWeight: "bold",
                    lineHeight: "1.5",
                    margin: 0,
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor: "#000",
                }}
            >
                {value}
            </Textfit>
        </div>
    );
};