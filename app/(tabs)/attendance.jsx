import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay(); // 0 = Sunday
};

export default function Attendance() {
  const router = useRouter();
  const [attendance, setAttendance] = useState({});

  const year = 2025;
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const toggleAttendance = (dateKey) => {
    setAttendance((prev) => {
      if (!prev[dateKey]) return { ...prev, [dateKey]: "Present" };
      if (prev[dateKey] === "Present") return { ...prev, [dateKey]: "Absent" };
      if (prev[dateKey] === "Absent") {
        const updated = { ...prev };
        delete updated[dateKey];
        return updated;
      }
      return prev;
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>📊 Attendance</Text>

      <ScrollView>
        {/* Days Header */}
        <View style={styles.row}>
          {["S","M","T","W","T","F","S"].map((d, idx) => (
            <Text key={idx} style={[styles.cell, styles.headerCell]}>{d}</Text>
          ))}
        </View>

        {/* Calendar per month */}
        {months.map((month, mIndex) => {
          const days = getDaysInMonth(mIndex, year);
          const firstDay = getFirstDayOfMonth(mIndex, year);

          let rows = [];
          let week = [];

          // Empty cells before first day
          for (let i = 0; i < firstDay; i++) {
            week.push(<View key={`empty-${mIndex}-${i}`} style={styles.cell} />);
          }

          for (let d = 1; d <= days; d++) {
            const dateKey = `${year}-${String(mIndex+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
            const status = attendance[dateKey];

            week.push(
              <TouchableOpacity
                key={`${month}-${d}`}
                style={[
                  styles.cell,
                  status === "Present" && styles.presentCell,
                  status === "Absent" && styles.absentCell,
                ]}
                onPress={() => toggleAttendance(dateKey)}
              >
                <Text style={styles.cellText}>
                  {status === "Present" ? "P" : status === "Absent" ? "A" : d}
                </Text>
              </TouchableOpacity>
            );

            if (week.length === 7) {
              rows.push(<View key={`week-${month}-${d}`} style={styles.row}>{week}</View>);
              week = [];
            }
          }

          // Fill last row
          if (week.length > 0) {
            while (week.length < 7) {
              week.push(<View key={`empty-end-${month}-${week.length}`} style={styles.cell} />);
            }
            rows.push(<View key={`last-${month}`} style={styles.row}>{week}</View>);
          }

          return (
            <View key={month} style={{ marginBottom: 30 }}>
              <Text style={styles.monthLabel}>{month}</Text>
              {rows}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a0b3f3ff", padding: 10 },
  backButton: {
    backgroundColor: "#65586bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  header: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  row: { 
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
  cell: {
    flex: 1,                 // responsive width
    aspectRatio: 1,          // square shape
    borderWidth: 0.5,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,               // spacing between boxes
  },
  cellText: { fontWeight: "bold", color: "#fff" },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  monthLabel: { fontWeight: "bold", marginVertical: 5 },
  presentCell: { backgroundColor: "green" },
  absentCell: { backgroundColor: "red" },
});
