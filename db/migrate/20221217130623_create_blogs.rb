class CreateBlogs < ActiveRecord::Migration[7.0]
  def change
    create_table :blogs do |t|
      t.string :creator
      t.integer :creatorId
      t.string :title
      t.text :body
      t.integer :likes
      t.integer :dislikes
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
