import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../component/loading/Loading";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedCompany, setSelectedCompany] = useState("");

  const { data: companies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ["my-companies", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-companies?email=${user.email}`);

      if (res.data?.length > 0 && !selectedCompany) {
        setSelectedCompany(res.data[0].companyName);
      }
      return res.data;
    },
  });

  const { data: team = [], isLoading: teamLoading } = useQuery({
    queryKey: ["company-team", selectedCompany],
    enabled: !!selectedCompany && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/company-team?companyName=${selectedCompany}`
      );
      return res.data;
    },
  });

  if (companiesLoading || teamLoading) {
    return <Loading />;
  }

  const currentMonth = new Date().getMonth();
  const birthdaysThisMonth = team.filter((member) => {
    if (!member.dateOfBirth) return false;
    return new Date(member.dateOfBirth).getMonth() === currentMonth;
  });

  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-secondary">My Team</h1>
          <p className="text-sm text-neutral">
            Colleagues from your organization
          </p>
        </div>

        <div className="flex justify-center">
          <select
            className="select select-bordered bg-base-200 w-full max-w-sm text-center"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {companies.map((company) => (
              <option key={company.companyName} value={company.companyName}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {team.map((member) => (
            <div
              key={member.email}
              className="w-full max-w-xs bg-base-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={member.photoURL}
                  alt={member.displayName}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold text-secondary">
                {member.displayName}
              </h3>

              <p className="text-sm text-neutral mt-1 break-all">
                {member.email}
              </p>

              <p className="text-xs text-gray-400 mt-3 uppercase tracking-wide">
                Employee
              </p>
            </div>
          ))}
        </div>

        {/* Upcoming Birthdays */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-base-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-secondary text-center mb-6">
              🎉 Upcoming Birthdays
            </h2>

            {birthdaysThisMonth.length === 0 ? (
              <p className="text-center text-sm text-neutral">
                No birthdays this month
              </p>
            ) : (
              <ul className="space-y-5">
                {birthdaysThisMonth.map((member) => (
                  <li
                    key={member.email}
                    className="flex items-center justify-center gap-4"
                  >
                    <img
                      src={member.photoURL}
                      alt={member.displayName}
                      className="w-11 h-11 rounded-full object-cover"
                    />

                    {/* NAME + DATE */}
                    <div className="text-left">
                      <h1 className="font-semibold text-4xl text-secondary">
                        {member.displayName}
                      </h1>
                      <p className="text-xs text-neutral">
                        {new Date(member.dateOfBirth).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                          }
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
