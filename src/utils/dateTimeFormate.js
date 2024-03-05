const DateFormate = (date) => {
    // Validate date input
    if (!date) {
        return "";
    }

    // Create Date objects for comparison
    const currentDate = new Date();
    const blogDate = new Date(date);

    // Calculate difference in milliseconds
    const timeDifference = currentDate.getTime() - blogDate.getTime();

    // Handle invalid date or future date
    if (isNaN(timeDifference) || timeDifference < 0) {
        return "Invalid date";
    }

    // Determine time units based on difference
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Construct formatted date string
    let formattedDate;
    if (seconds < 60) {
        formattedDate = `${seconds} seconds ago`;
    } else if (minutes < 60) {
        formattedDate = `${minutes} minutes ago`;
    } else if (hours < 24) {
        formattedDate = `${hours} hours ago`;
    } else if (days < 7) {
        formattedDate = `${days} days ago`;
    } else if (weeks < 52) {
        formattedDate = blogDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } else {
        formattedDate = blogDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    return formattedDate;
};


export default DateFormate;
