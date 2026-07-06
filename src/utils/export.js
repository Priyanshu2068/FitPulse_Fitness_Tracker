import jsPDF from 'jspdf';

export function exportWorkoutsCsv(workouts) {
  const headers = ['Workout Name', 'Category', 'Duration', 'Calories Burned', 'Date', 'Notes'];
  const rows = workouts.map((workout) => [
    workout.name,
    workout.category,
    workout.duration,
    workout.calories,
    workout.date,
    workout.notes,
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'fitpulse-workouts.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadAnalyticsPdf({ workouts, calories, duration }) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text('FitPulse Analytics Summary', 18, 24);
  doc.setFontSize(12);
  doc.text(`Total workouts: ${workouts.length}`, 18, 44);
  doc.text(`Total calories burned: ${calories}`, 18, 56);
  doc.text(`Total workout time: ${duration} minutes`, 18, 68);
  doc.text('Generated from your local FitPulse dashboard.', 18, 88);
  doc.save('fitpulse-analytics.pdf');
}
