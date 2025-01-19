'use client';

import { useOpportunities } from '@/hooks/useOpportunities';

export default function OpportunitiesPage() {
  const { data: opportunities, isLoading, error } = useOpportunities();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading opportunities</div>;

  return (
    <div>
      {opportunities?.map((opportunity) => (
        <div key={opportunity.id}>
          <h2>{opportunity.title}</h2>
          <p>{opportunity.description}</p>
        </div>
      ))}
    </div>
  );
} 