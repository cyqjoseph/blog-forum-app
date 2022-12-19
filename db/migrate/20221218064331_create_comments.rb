class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.string :commenter
      t.integer :commenterId
      t.integer :blogId
      t.text :body
      t.integer :likes
      t.integer :dislikes
      t.references :blog, null: false, foreign_key: true

      t.timestamps
    end
  end
end
