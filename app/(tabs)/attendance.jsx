import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../contexts/UserContext";
import { useRouter } from "expo-router";

export default function Attendance() {
  const router = useRouter();
  const { attendance, toggleAttendance } = useContext(UserContext);

  const [localAttendance, setLocalAttendance] = useState([]);
  useEffect(() => setLocalAttendance(attendance), [attendance]);

  const year = 2025;
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  const getStatus = (dateKey) => localAttendance.find(a => a.date === dateKey)?.status;

  const handleToggle = (dateKey) => {
    setLocalAttendance((prev) => {
      const existing = prev.find(a => a.date === dateKey);
      if (existing) {
        return prev.map(a =>
          a.date === dateKey
            ? { ...a, status: a.status === "Present" ? "Absent" : a.status === "Absent" ? null : "Present" }
            : a
        ).filter(a => a.status !== null);
      } else {
        return [...prev, { date: dateKey, status: "Present" }];
      }
    });
    toggleAttendance(dateKey);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>📊 Attendance</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Weekday Header */}
        <View style={styles.weekRow}>
          {["S","M","T","W","T","F","S"].map((d, idx) => (
            <View key={idx} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{d}</Text>
            </View>
          ))}
        </View>

        {/* Monthly Calendars */}
        {months.map((month, mIndex) => {
          const days = getDaysInMonth(mIndex, year);
          const firstDay = getFirstDayOfMonth(mIndex, year);

          let rows = [];
          let week = [];

          for (let i = 0; i < firstDay; i++) week.push(<View key={`empty-${mIndex}-${i}`} style={styles.cell} />);

          for (let d = 1; d <= days; d++) {
            const dateKey = `${year}-${String(mIndex+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
            const status = getStatus(dateKey);

            week.push(
              <TouchableOpacity
                key={`${month}-${d}`}
                style={[
                  styles.cell,
                  status === "Present" && styles.presentCell,
                  status === "Absent" && styles.absentCell,
                ]}
                onPress={() => handleToggle(dateKey)}
              >
                <Text style={[
                  styles.cellText,
                  status === "Present" ? styles.presentText : status === "Absent" ? styles.absentText : styles.defaultText
                ]}>
                  {status === "Present" ? "P" : status === "Absent" ? "A" : d}
                </Text>
              </TouchableOpacity>
            );

            if (week.length === 7) {
              rows.push(<View key={`week-${month}-${d}`} style={styles.weekRow}>{week}</View>);
              week = [];
            }
          }

          if (week.length > 0) {
            while (week.length < 7) week.push(<View key={`empty-end-${month}-${week.length}`} style={styles.cell} />);
            rows.push(<View key={`last-${month}`} style={styles.weekRow}>{week}</View>);
          }

          return (
            <View key={month} style={styles.monthContainer}>
              <Text style={styles.monthLabel}>{month}</Text>
              {rows}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a0b3f3ff", padding: 12 },
  backButton: {
    backgroundColor: "#65586bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  backButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  header: { fontSize: 26, textAlign: "center", fontWeight: "bold", marginBottom: 15, color: "#222" },

  weekRow: { flexDirection: "row", justifyContent: "space-between" },
  weekDayCell: { flex: 1, aspectRatio: 1, justifyContent: "center", alignItems: "center", margin: 1 },
  weekDayText: { fontWeight: "bold", color: "#555" },

  cell: { flex: 1, aspectRatio: 1, justifyContent: "center", alignItems: "center", margin: 1, borderWidth: 0.5, borderColor: "#ccc", backgroundColor: "#d0d7f5ff", borderRadius: 6 },
  cellText: { fontWeight: "bold" },
  defaultText: { color: "#222" },
  presentCell: { backgroundColor: "#4CAF50" },
  absentCell: { backgroundColor: "#f44336" },
  presentText: { color: "#fff" },
  absentText: { color: "#fff" },

  monthContainer: { marginBottom: 25 },
  monthLabel: { fontWeight: "bold", fontSize: 18, marginBottom: 6, color: "#222", textAlign: "center" },
});
