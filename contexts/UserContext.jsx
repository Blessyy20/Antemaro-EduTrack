import { createContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [announcements, setAnnouncements] = useState([]);


  // -----------------------
  // User signup
  // -----------------------
  const signupUser = async ({ name, strand, grade, email, password }) => {
    if (!name || !strand || !grade || !email || !password)
      throw new Error("Fill all fields");

    setLoading(true);
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) throw new Error("Email already exists");

      const docRef = await addDoc(collection(db, "users"), {
        name,
        strand,
        grade,
        email,
        password,
      });
      setCurrentUser({ id: docRef.id, name, strand, grade, email });
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // User login
  // -----------------------
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", email),
        where("password", "==", password)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) throw new Error("Invalid email or password");

      const userData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      setCurrentUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Update Avatar
  // -----------------------
  const updateUserAvatar = async (userId, avatarUri) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { avatar: avatarUri });
    if (currentUser?.id === userId) {
      setCurrentUser({ ...currentUser, avatar: avatarUri });
    }
  };

  // -----------------------
  // Tasks logic
  // -----------------------
  useEffect(() => {
    if (!currentUser) return;
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", currentUser.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(userTasks);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const addTask = async (text) => {
    if (!currentUser || !text.trim()) return;
    await addDoc(collection(db, "tasks"), { text, userId: currentUser.id });
  };

  const editTask = async (id, newText) => {
    if (!newText.trim()) return;
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, { text: newText });
  };

  const deleteTask = async (id) => {
    const taskRef = doc(db, "tasks", id);
    await deleteDoc(taskRef);
  };

  // -----------------------
  // Schedules logic
  // -----------------------
  useEffect(() => {
    if (!currentUser) return;
    const schedulesRef = collection(db, "schedules");
    const q = query(schedulesRef, where("userId", "==", currentUser.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userSchedules = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchedules(userSchedules);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const addSchedule = async (subject, time) => {
    if (!currentUser || !subject.trim() || !time.trim()) return;
    await addDoc(collection(db, "schedules"), {
      userId: currentUser.id,
      subject,
      time,
      createdAt: new Date(),
    });
  };

  const editSchedule = async (id, subject, time) => {
    if (!subject.trim() || !time.trim()) return;
    const scheduleRef = doc(db, "schedules", id);
    await updateDoc(scheduleRef, { subject, time });
  };

  const deleteSchedule = async (id) => {
    const scheduleRef = doc(db, "schedules", id);
    await deleteDoc(scheduleRef);
  };

  useEffect(() => {
  if (!currentUser) return;

  const gradesRef = collection(db, "grades");
  const q = query(gradesRef, where("userId", "==", currentUser.id));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const userGrades = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGrades(userGrades);
  });

  return () => unsubscribe();
}, [currentUser]);

// Add a grade
const addGrade = async (subject, grade) => {
  if (!currentUser || !subject.trim() || !grade.trim()) return;
  await addDoc(collection(db, "grades"), {
    userId: currentUser.id,
    subject,
    grade: grade + "%",
    createdAt: new Date(),
  });
};

// Edit a grade
const editGrade = async (id, subject, grade) => {
  if (!subject.trim() || !grade.trim()) return;
  const gradeRef = doc(db, "grades", id);
  await updateDoc(gradeRef, { subject, grade: grade + "%" });
};

// Delete a grade
const deleteGrade = async (id) => {
  const gradeRef = doc(db, "grades", id);
  await deleteDoc(gradeRef);
};

useEffect(() => {
  if (!currentUser) return;

  const attendanceRef = collection(db, "attendance");
  const q = query(attendanceRef, where("userId", "==", currentUser.id));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const userAttendance = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setAttendance(userAttendance);
  });

  return () => unsubscribe();
}, [currentUser]);

// Add or update attendance
const toggleAttendance = async (dateKey) => {
  if (!currentUser) return;

  const existing = attendance.find(a => a.date === dateKey);
  try {
    if (!existing) {
      await addDoc(collection(db, "attendance"), {
        userId: currentUser.id,
        date: dateKey,
        status: "Present",
        createdAt: new Date()
      });
    } else if (existing.status === "Present") {
      const docRef = doc(db, "attendance", existing.id);
      await updateDoc(docRef, { status: "Absent" });
    } else if (existing.status === "Absent") {
      const docRef = doc(db, "attendance", existing.id);
      await deleteDoc(docRef);
    }
  } catch (err) {
    console.error("Attendance error:", err);
  }
};

// -----------------------
// Announcements logic
// -----------------------
useEffect(() => {
  if (!currentUser) return;

  const annRef = collection(db, "announcements");
  const q = query(annRef, where("userId", "==", currentUser.id));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const userAnnouncements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAnnouncements(userAnnouncements);
  });

  return () => unsubscribe();
}, [currentUser]);

const addAnnouncement = async (text) => {
  if (!currentUser || !text.trim()) return;
  await addDoc(collection(db, "announcements"), {
    userId: currentUser.id,
    text,
    createdAt: new Date(),
  });
};

const editAnnouncement = async (id, newText) => {
  if (!newText.trim()) return;
  const annRef = doc(db, "announcements", id);
  await updateDoc(annRef, { text: newText });
};

const deleteAnnouncement = async (id) => {
  const annRef = doc(db, "announcements", id);
  await deleteDoc(annRef);
};


  return (
    <UserContext.Provider
  value={{
    currentUser,
    setCurrentUser,
    loading,
    signupUser,
    loginUser,
    updateUserAvatar,

    // Tasks
    tasks,
    addTask,
    editTask,
    deleteTask,

    // Schedules
    schedules,
    addSchedule,
    editSchedule,
    deleteSchedule,

    // Grades
    grades,
    addGrade,
    editGrade,
    deleteGrade,

    // Attendance
    attendance,
    toggleAttendance,

    // Announcements
    announcements,
    addAnnouncement,
    editAnnouncement,
    deleteAnnouncement,
  }}
>
  {children}
</UserContext.Provider>
  );
}
