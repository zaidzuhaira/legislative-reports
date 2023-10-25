interface Result {
  id: string;
  legislator_id: string;
  vote_id: string;
  vote_type: '1' | '2';
}

interface Vote {
  id: string;
  bill_id: string;
}

const getResultByVoteId = (results: Result[], id: string) => results.find(r => r.vote_id === id);

export const countVotesByBill = (results: Result[], votes: Vote[], billId: string): number => {
  return votes.reduce((count, v) => {
    const result = getResultByVoteId(results, v.id);
    if (v.bill_id === billId && result?.vote_type === '1') {
      count++;
    }
    return count;
  }, 0);
};

export const countOpposedVotesByBill = (results: Result[], votes: Vote[], billId: string): number => {
  return votes.reduce((count, v) => {
    const result = getResultByVoteId(results, v.id);
    if (v.bill_id === billId && result?.vote_type === '2') {
      count++;
    }
    return count;
  }, 0);
};
