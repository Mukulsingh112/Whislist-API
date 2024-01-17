import { Request, Response } from 'express';
import WishlistItem from '../models/WishlistItem';

export const addToWishlist = async (req: Request, res: Response) => {
  const { productId, userId } = req.body;

  try {
    const existingItem = await WishlistItem.findOne({ productId, userId });

    if (existingItem) {
      return res.status(400).json({ message: 'Item already exists in the wishlist' });
    }

    const wishlistItem = new WishlistItem({ productId, userId });
    await wishlistItem.save();

    res.status(201).json({ message: 'Item added to the wishlist', wishlistItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { productId, userId } = req.params;

  try {
    const wishlistItem = await WishlistItem.findOneAndDelete({ productId, userId });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Item not found in the wishlist' });
    }

    res.status(200).json({ message: 'Item removed from the wishlist', wishlistItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const wishlist = await WishlistItem.find({ userId });
    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};