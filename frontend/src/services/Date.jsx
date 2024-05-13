import React from "react";

export const TimestampConverter = ({ timestamp }) => {

    // Input -> 20244182256275000000

    // Convert timestamp to string
    const timestampString = timestamp.toString();

    // Remove the unnecessary zeros
    const trimmedTimestamp = timestampString.slice(0, -12);

    // Replace all commas with dashes
    const noCommas = trimmedTimestamp.replace(/,/g, '-');

    // Split the timestamp into year, month, day, hour, and minute
    const [year, month, day, hour, minute] = noCommas.split('-');

    // Create a Date object
    //onst date = new Date(year, month - 1, day, hour, minute);

    // Format the date
    const formattedDate = `${getOrdinal(day)} of ${getMonthName(month)} ${year} at ${formatAMPM(hour, minute)}`;

    console.log(formattedDate);

    return <div>{formattedDate}</div>;
};

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getMonthName(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month - 1];
}

function formatAMPM(hours, minutes) {
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes || '00'; // If minutes are undefined, set them to '00'
    return hours + ":" + minutes + " " + ampm;
}
