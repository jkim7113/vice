const useSwipe = ({ wrapper, index, setIndex, maxIndex }) => {
    let pressed = false;
    let startX;
    let x;

    const pointerdownHandler = (e) => {
        if(e.which == 3) return;
        pressed = true;
        startX = e.offsetX;
        wrapper?.style?.setProperty("cursor", "grabbing");
    }
    const pointerupHandler = (e) => {
        if(e.which == 3) return;
        pressed = false;
        wrapper?.style?.setProperty("cursor", "grab");

        const width = wrapper?.offsetWidth;
        const distanceMoved = Math.abs(x - startX);
        const direction = Math.sign(x - startX);

        if (distanceMoved < width * 0.1 || !distanceMoved) return; //The user swiped too little or didnt swipe at all.
        if (direction < 0){ //If the user swiped to the left
            if (index >= maxIndex) return setIndex(0);
            setIndex(index + 1);
        } else {//to the right
            if (index <= 0) return setIndex(maxIndex);
            setIndex(index - 1);
        }
    }
    const pointermoveHandler = (e) => {
        if (!pressed) return;
        e.preventDefault();
        x = e.offsetX;
    }
    const removeListeners = () => {
        wrapper?.removeEventListener("pointerdown", pointerdownHandler);
        wrapper?.removeEventListener("pointerup", pointerupHandler);
        wrapper?.removeEventListener("pointermove", pointermoveHandler);
    }
    const addListeners = () => {
        wrapper?.addEventListener("pointerdown", pointerdownHandler);
        wrapper?.addEventListener("pointerup", pointerupHandler);
        wrapper?.addEventListener("pointermove", pointermoveHandler);
    }
    return {
        enableSwipe: addListeners,
        disableSwipe: removeListeners,
    };
}

export default useSwipe;