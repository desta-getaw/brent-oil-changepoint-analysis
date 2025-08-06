// app.js

/**
 * App-level logic to manage data filtering, chart updating, and key event highlighting
 */
import { parseCSV, parseDate, keyEvents } from './data.js';
import { initializeChart, updateChartWithEvent, updateChartWithRange } from './chart.js';
import { updateAnalysis } from './analysis.js';

// --- MAIN APP INIT ---
document.addEventListener('DOMContentLoaded', () => {
    const csvData = document.getElementById('csvData').textContent;
    const oilData = parseCSV(csvData);

    const eventSelector = document.getElementById('eventSelector');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const applyFilterBtn = document.getElementById('applyFilter');
    const resetFilterBtn = document.getElementById('resetFilter');

    // Populate event selector
    keyEvents.forEach(event => {
        const option = document.createElement('option');
        option.value = event.date;
        option.textContent = event.description;
        eventSelector.appendChild(option);
    });

    // Initialize chart
    const chartInstance = initializeChart(oilData);

    // Event listener for key event highlighting
    eventSelector.addEventListener('change', (e) => {
        const selectedDate = e.target.value;
        updateChartWithEvent(chartInstance, oilData, selectedDate);
    });

    // Event listener for applying date filter
    applyFilterBtn.addEventListener('click', () => {
        const start = new Date(startDateInput.value);
        const end = new Date(endDateInput.value);
        const filtered = oilData.filter(d => d.date >= start && d.date <= end);

        updateChartWithRange(chartInstance, filtered);
        updateAnalysis(filtered);
    });

    // Reset filter
    resetFilterBtn.addEventListener('click', () => {
        startDateInput.value = '';
        endDateInput.value = '';
        updateChartWithRange(chartInstance, oilData);
        updateAnalysis([]); // Hide metrics
    });
});
