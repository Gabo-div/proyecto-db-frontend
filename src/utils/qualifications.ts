import { Qualification } from "@/models/qualification";

type YearQualifications = Record<
  "1" | "2" | "3" | "4" | "5",
  Record<string, CourseQualifications>
>;

type CourseQualifications = {
  teacher_name: string;
  lapses: [number | null, number | null, number | null];
  final: number | null;
};

type StudentQualifications = {
  student_name: string;
  student_id: number;
  lapses: [number | null, number | null, number | null];
  final: number | null;
};

export const groupQualificatinsByStudent = (
  qualifications: (Qualification & { student_name: string })[],
): StudentQualifications[] => {
  const grouped: StudentQualifications[] = [];

  for (const qualification of qualifications) {
    const existing = grouped.findIndex(
      (q) => q.student_name === qualification.student_name,
    );

    if (existing === -1) {
      const index = qualification.lapse - 1;
      const lapses: [number | null, number | null, number | null] = [
        null,
        null,
        null,
      ];

      lapses[index] = qualification.value;

      grouped.push({
        student_id: qualification.student_id,
        student_name: qualification.student_name,
        lapses,
        final: qualification.lapse === 3 ? qualification.value : null,
      });

      continue;
    }

    const index = qualification.lapse - 1;
    const lapses = grouped[existing].lapses;
    lapses[index] = qualification.value;

    grouped[existing].lapses = lapses;
    const lapse1 = grouped[existing].lapses[0];
    const lapse2 = grouped[existing].lapses[1];
    const lapse3 = grouped[existing].lapses[2];

    if (lapse1 && lapse2 && lapse3) {
      grouped[existing].final = (lapse1 + lapse2 + lapse3) / 3;
    }
  }

  return grouped;
};

export const groupQualifications = (
  qualifications: Qualification[],
): YearQualifications => {
  const groupedByYear = groupBy(qualifications, (q) => q.course_year);

  const grouped: YearQualifications = {
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
  };

  for (const [year, yearGroup] of Object.entries(groupedByYear)) {
    for (const [course, courseGroup] of Object.entries(
      groupBy(yearGroup, (q) => q.course_name),
    )) {
      if (
        year !== "1" &&
        year !== "2" &&
        year !== "3" &&
        year !== "4" &&
        year !== "5"
      ) {
        continue;
      }

      const teacherName = courseGroup[0].teacher_name;

      const firstLapse = courseGroup.find((q) => q.lapse === 1)?.value || null;
      const secondLapse = courseGroup.find((q) => q.lapse === 2)?.value || null;
      const thirdLapse = courseGroup.find((q) => q.lapse === 3)?.value || null;
      let final: number | null = null;

      if (firstLapse && secondLapse && thirdLapse) {
        final = (firstLapse + secondLapse + thirdLapse) / 3;
      }

      if (!grouped[year][course]) {
        grouped[year][course] = {
          teacher_name: teacherName,
          lapses: [firstLapse, secondLapse, thirdLapse],
          final,
        };
      }
    }
  }

  return grouped;
};

const groupBy = <K extends string | number, V>(
  array: V[],
  cb: (item: V) => K,
) => {
  return array.reduce(
    (acc, item) => {
      const key = cb(item);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);

      return acc;
    },
    {} as Record<K, V[]>,
  );
};
