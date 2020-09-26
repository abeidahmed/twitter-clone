class User
  module Authentication
    extend ActiveSupport::Concern

    included do
      has_secure_password
    end

    module ClassMethods
      def find_by_credentials(email, password)
        user = self.find_by(email: email.downcase)
        return nil unless user
        user.authenticate(password) ? user : nil
      end
    end
  end
end