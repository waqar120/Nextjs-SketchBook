import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MENU_ITEMS } from "../../constant";
import { menuItemClick, actionItemClick } from "../slice/menuSlice";
const Board = () => {
	const dispatch = useDispatch();

	const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
	const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
	const canvasRef = useRef();
	const drawHistory = useRef([]);
	const historyPointer = useRef(0);
	const shouldDraw = useRef(false);

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
			const URL = canvas.toDataURL();
			const anchor = document.createElement("a");
			anchor.href = URL;
			anchor.download = "sketch.png";
			anchor.click();
		} else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
			if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
			if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
			const imageData = drawHistory.current[historyPointer.current];
			context.putImageData(imageData, 0, 0);
		}
		dispatch(actionItemClick(null));
		console.log("actionMenuItem", actionMenuItem);
	}, [actionMenuItem]);

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		const changeConfig = () => {
			context.strokeStyle = color;
			context.lineWidth = size;
		};

		changeConfig();
	}, [color, size]);

	// Before Browser Pant
	useLayoutEffect(() => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const beginPath = (x, y) => {
			context.beginPath();
			context.moveTo(x, y);
		};
		const linePath = (x, y) => {
			context.lineTo(x, y);
			context.stroke();
		};

		const handleMouseDown = (e) => {
			shouldDraw.current = true;
			beginPath(e.clientX, e.clientY);
		};

		const handleMouseMove = (e) => {
			if (!shouldDraw.current) return;
			linePath(e.clientX, e.clientY);
		};

		const handleMouseUp = () => {
			shouldDraw.current = false;
			const ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
			drawHistory.current.push(ImageData);
			historyPointer.current = drawHistory.current.length - 1;
		};

		canvas.addEventListener("mousedown", handleMouseDown);
		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("mouseup", handleMouseUp);

		return () => {
			canvas.removeEventListener("mousedown", handleMouseDown);
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("mouseup", handleMouseUp);
		};
	}, [shouldDraw]);

	console.log(color, size);

	return (
		<>
			<canvas ref={canvasRef}></canvas>
		</>
	);
};

export default Board;
