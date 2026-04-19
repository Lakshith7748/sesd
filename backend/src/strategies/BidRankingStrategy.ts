import { IBid } from "../models/Bid";

export interface IBidRankingStrategy {
  rank(bids: IBid[]): IBid[];
}

export class ByPriceAscending implements IBidRankingStrategy {
  rank(bids: IBid[]): IBid[] {
    return [...bids].sort((a, b) => a.amount - b.amount);
  }
}

export class ByDateAscending implements IBidRankingStrategy {
  rank(bids: IBid[]): IBid[] {
    return [...bids].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }
}
