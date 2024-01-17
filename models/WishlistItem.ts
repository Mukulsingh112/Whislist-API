import mongoose, { Document, Schema } from 'mongoose';

export interface IWishlistItem extends Document {
  productId: string;
  userId: string;
}

const wishlistItemSchema = new Schema({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model<IWishlistItem>('WishlistItem', wishlistItemSchema);
