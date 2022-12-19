class Blog < ApplicationRecord
  acts_as_taggable_on :tags
  validates :title, length: { minimum: 1 }
  validates :body, length: { minimum: 4 }
  validates :creator, presence: true
  validates :creatorId, presence: true
  validates :likes, presence: true
  validates :dislikes, presence: true
  belongs_to :user
  has_many :comments, dependent: :destroy
end
