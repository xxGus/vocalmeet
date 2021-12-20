import React, { useState, useEffect } from "react";
import { Card, Typography, Input, Form } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const CodeValidator = () => {
	const [form] = Form.useForm();
	const [answer, setAnswer] = useState("");
	const [show, setShow] = useState(false);
	const [code, setCode] = useState("");

	const onChange = (event) => {
		let text = event.target.value.replace(
			new RegExp(/(?![<>{}()[\]])[a-zA-Z0-9]*\W/g),
			"",
		);
		setCode(text);

		if (text[0] !== "<" || text[text.length - 1] !== ">") {
			setAnswer("Invalid");
		}

		if (text.length % 2 !== 0) {
			setAnswer("Invalid");
		}

		if (text.length % 2 === 0) {
	
			let c1 = text.match(/[<]/g) != null ? text.match(/[<]/g).length : 0;
			let c2 = text.match(/[>]/g) != null ? text.match(/[>]/g).length : 0;
			let c3 = text.match(/[\[]/g) != null ? text.match(/[\[]/g).length : 0;
			let c4 = text.match(/[\]]/g) != null ? text.match(/[\]]/g).length : 0;
			let c5 = text.match(/[{]/g) != null ? text.match(/[{]/g).length : 0;
			let c6 = text.match(/[}]/g) != null ? text.match(/[}]/g).length : 0;
			let c7 = text.match(/[(]/g) != null ? text.match(/[(]/g).length : 0;
			let c8 = text.match(/[)]/g) != null ? text.match(/[)]/g).length : 0;

			if (c1 !== c2 || c3 !== c4 || c5 !== c6 || c7 !== c8) {
				setAnswer("Invalid");
            } else {
                setAnswer(
                    `Valid: '<'=${c1} '>'=${c2} '['=${c3} ']'=${c4} '{'=${c5} '}'=${c6} '('=${c7} ')'=${c8}`,
                );
            }
            
            let left = text.substring(0, text.length / 2);
			let right = text.substring(text.length / 2, text.length);

			for (let i = 0; i < left.length; i++) {
				if (
					left[i] === ">" ||
					left[i] === "]" ||
					left[i] === "}" ||
					left[i] === ")"
				) {
					setAnswer("Invalid");
				}
			}
			for (let i = 0; i < right.length; i++) {
				if (
					right[i] === "<" ||
					right[i] === "[" ||
					right[i] === "{" ||
					right[i] === "("
				) {
					setAnswer("Invalid");
				}
			}
        }
        
        if (text.length === 0) {
            setAnswer("Invalid");
        }
	};
	return (
		<Card>
			<Title>Code Validator</Title>
			<TextArea value={code} onChange={onChange} />
			{answer}
		</Card>
	);
};

export default CodeValidator;
