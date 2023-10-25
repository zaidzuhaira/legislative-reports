interface Result {
    id: string;
    legislator_id: string;
    vote_id: string;
    vote_type: '1' | '2';
}

export const countVotesByLegislator = (results: Result[], legislatorId: string): number => {
    return results.reduce((count, v) => {
      if (v.legislator_id === legislatorId && v.vote_type === '1') {
        count++;
      }
      return count;
    }, 0);
};
  

export const countOpposedVotesByLegislator = (results: Result[], legislatorId: string): number => {
  return results.reduce((count, v) => {
      if (v.legislator_id === legislatorId && v.vote_type === '2') {
          count++;
      }
      return count;
  }, 0);
}
