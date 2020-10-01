class Tweet
  module Filterable
    extend ActiveSupport::Concern

    included do
      scope :consist_images, -> { where.not(image: nil) }
    end

    module ClassMethods
      def filter_user_tweet_by_type(term)
        if term.present?
          if term == 'media'
            consist_images
          end
        else
          self.all
        end
      end
    end
  end
end