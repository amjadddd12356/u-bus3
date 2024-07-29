
/// script.js

// بيانات الرحلات الحالية
const currentTrips = [
    { lineName: 'مشروع دمر + ضاحية قدسيا', date: '2024-07-15', startTime: '06:50:00', expectedArrivalTime: '07:50:00', studentCount: 45 },
];

// بيانات الرحلات السابقة
const pastTrips = [
    { lineName: 'مشروع دمر + ضاحية قدسيا', date: '2024-07-14', startTime: '06:50:00', arrivalTime: '07:50:00', studentCount: 45 },
    { lineName: 'مشروع دمر + ضاحية قدسيا', date: '2024-07-13', startTime: '06:50:00', arrivalTime: '07:50:00', studentCount: 45},
    { lineName: 'مشروع دمر + ضاحية قدسيا', date: '2024-07-12', startTime: '06:50:00', arrivalTime: '07:50:00', studentCount: 45},
    { lineName: 'مشروع دمر + ضاحية قدسيا', date: '2024-07-11', startTime: '06:50:00', arrivalTime: '07:50:00', studentCount: 45},
    { lineName: 'مشروع دمر + ضاحية قدسيا', date: '2024-07-10', startTime: '06:50:00', arrivalTime: '07:50:00', studentCount: 45},
    { lineName: 'مشروع دمر + ضاحية قدسيا', date: '2024-07-09', startTime: '06:50:00', arrivalTime: '07:50:00', studentCount: 45},
    { lineName: 'مشروع دمر + ضاحية قدسيا', date: '2024-07-08', startTime: '06:50:00', arrivalTime: '07:50:00', studentCount: 45},
    // يمكن إضافة المزيد من البيانات هنا
];

// دالة لبدء الرحلة
function startTrip() {
    alert('تم بدء الرحلة');
    window.location.href = 'current_trip.html';
}

// دالة لنهاية الرحلة
function endTrip() {
    // الحصول على الوقت الحالي
    const arrivalTime = new Date().toISOString();
    const date = arrivalTime.split('T')[0];

    // نقل جميع الرحلات الحالية إلى الرحلات السابقة
    currentTrips.forEach(trip => {
        pastTrips.push({
            lineName: trip.lineName,
            date: trip.date,
            startTime: trip.startTime,
            arrivalTime: arrivalTime,
            studentCount: trip.studentCount
        });
    });

    // مسح جميع الرحلات الحالية
    currentTrips.length = 0;

    // تحديث التخزين المحلي (إذا لزم الأمر)
    localStorage.setItem('pastTrips', JSON.stringify(pastTrips));

    // الانتقال إلى واجهة الرحلات السابقة
    window.location.href = 'past_trips.html';
}

// دالة لعرض الرحلة الحالية
function displayCurrentTrip() {
    const table = document.getElementById('current-trip-table');
    currentTrips.forEach((trip, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trip.lineName}</td>
            <td>${trip.date}</td>
            <td>${trip.startTime}</td>
            <td>${trip.expectedArrivalTime}</td>
            <td><input type="number" value="${trip.studentCount}" onchange="updateStudentCount(${index}, this.value)"></td>
        `;
        table.appendChild(row);
    });
}

// دالة لتحديث عدد الطلاب في الرحلة الحالية
function updateStudentCount(index, newValue) {
    currentTrips[index].studentCount = parseInt(newValue, 10);
}

// دالة لعرض الرحلات السابقة
function displayPastTrips() {
    const table = document.getElementById('past-trips-table');
    pastTrips.forEach((trip , index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trip.lineName}</td>
            <td>${trip.date}</td>
            <td>${trip.startTime}</td>
            <td>${trip.arrivalTime}</td>
             <td><input type="number" value="${trip.studentCount}" onchange="updateStudentCount(${index}, this.value)"></td>
        `;
        table.appendChild(row);
    });
}

// استدعاء الدوال بناءً على الصفحة
if (window.location.pathname.includes('current_trip.html')) {
    displayCurrentTrip();
} else if (window.location.pathname.includes('past_trips.html')) {
    displayPastTrips();
}
