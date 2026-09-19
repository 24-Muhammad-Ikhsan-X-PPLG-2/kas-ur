"use client";

import { FC } from "react";
import BendaharaPage from "./components/BendaharaPage";
import { useBendaharaForm } from "./hooks/useBendaharaForm";
import { BendaharaClientProps } from "./types";

export type { Member, PaymentRecord, Period, SummaryData } from "./types";

const BendaharaClient: FC<BendaharaClientProps> = (props) => {
  const bendaharaForm = useBendaharaForm(props);

  return <BendaharaPage {...bendaharaForm} />;
};

export default BendaharaClient;
