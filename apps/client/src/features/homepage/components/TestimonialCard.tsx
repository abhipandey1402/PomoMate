import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  name: string;
  role: string;
  content: string;
  avatar: string;
};

type TestimonialCardProps = {
  testimonials: Testimonial[]; // Wraps the array in an object as props
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonials }) => (
  <div className="container mx-auto px-10 py-24">
    <h2 className="text-5xl font-bold text-center text-white mb-12">
      Loved by Developer Teams
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold mr-4">
                {testimonial.avatar}
              </div>
              <div>
                <h4 className="text-xl text-white font-semibold">{testimonial.name}</h4>
                <p className="text-gray-400 text-lg">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-lg text-gray-300">{testimonial.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default TestimonialCard;
