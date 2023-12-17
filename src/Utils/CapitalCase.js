export  function capitalizeFirstLetterOfEachWord(inputString) {
    if( inputString === "")return inputString;
    return inputString.replace(/\b\w/g, char => char.toUpperCase());
}
