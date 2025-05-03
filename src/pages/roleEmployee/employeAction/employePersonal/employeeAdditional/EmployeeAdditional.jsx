import {
  DisciplinaryAction,
  Encourage,
  HandicappedAdditional,
  NoteBookAdditional,
  PersonMidical,
  PersonVacation,
} from "components";

export const EmployeeAdditional = () => {
  return (
    <>
      {/* Daftarga qo'shish */}
      <NoteBookAdditional />
      {/* Nogironligi qo'shish */}
      <HandicappedAdditional />
      {/* Ta'til qo’shish */}
      <PersonVacation />
      {/* Tibbiy ko'rik qo’shish */}
      <PersonMidical />
      {/* intizomiy jazo */}
      <DisciplinaryAction />
      {/* Ragbatlantitrish */}
      <Encourage />
    </>
  );
};
