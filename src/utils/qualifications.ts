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
