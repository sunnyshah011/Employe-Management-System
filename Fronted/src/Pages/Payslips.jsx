import { useCallback, useEffect, useState } from 'react';
import { dummyEmployeeData, dummyPayslipData } from '../assets/assets';
import LoadingAnimation from '../Component/LoadingAnimation';

const Payslips = () => {

  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = true;

  const fetchPayslips = useCallback(async () => {
    setPayslips(dummyPayslipData);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchPayslips();

    if (isAdmin) {
      setEmployees(dummyEmployeeData);
    }
  }, [fetchPayslips, isAdmin]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="animate-fade-in">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div>
          <h1 className="page-title">
            Payslips
          </h1>

          <p className="page-subtitle">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslip history"}
          </p>
        </div>

        {isAdmin && (
          <button className="btn-primary">
            Generate Payslip
          </button>
        )}

      </div>

      <p>Payslip List</p>

    </div>
  );
};

export default Payslips;