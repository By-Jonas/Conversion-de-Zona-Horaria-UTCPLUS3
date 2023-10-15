function convertTime() {
    const datetimeInput = document.getElementById("datetimeInput").value;
    const timezoneSelect = document.getElementById("timezoneSelect");
    const selectedTimezone = timezoneSelect.options[timezoneSelect.selectedIndex].value;

    // Validar el formato de entrada
    const dateTimeRegex = /^(\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})$/;
    if (!dateTimeRegex.test(datetimeInput)) {
        document.getElementById("result").textContent = "Formato de fecha y hora no válido.";
        return;
    }

    const inputDatetimeParts = datetimeInput.split(" ");
    const dateParts = inputDatetimeParts[0].split("-");
    const timeParts = inputDatetimeParts[1].split(":");

    const inputDatetime = new Date(
        Date.UTC(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2])
    );

    const utc3Time = new Date(inputDatetime.getTime() - 3 * 60 * 60 * 1000); // Convert UTC+3 to UTC

    // Calcular el desfase en función de la zona horaria seleccionada
    const offsetHours = parseInt(selectedTimezone.substr(3));
    const convertedTime = new Date(utc3Time.getTime() + offsetHours * 60 * 60 * 1000);

    const day = convertedTime.getUTCDate();
    const month = convertedTime.getUTCMonth() + 1;
    const year = convertedTime.getUTCFullYear();
    const hours = convertedTime.getUTCHours();
    const minutes = convertedTime.getUTCMinutes();
    const seconds = convertedTime.getUTCSeconds();

    const formattedResult = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById("result").textContent = `Hora convertida en ${selectedTimezone}: ${formattedResult}`;
}
