class User
  module Filterable
    extend ActiveSupport::Concern

    module ClassMethods
      def search(keyword)
        if keyword.present?
          where(
            'name iLIKE :keyword OR email iLIKE :keyword OR twitter_handle iLIKE :keyword',
            keyword: "%#{keyword}%"
          )
        else
          self.all
        end
      end
    end
  end
end