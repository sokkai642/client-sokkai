function PaymentMethod({ value, label, selected, onChange, disabled }) {
  return (
    <label className="payment-option">
      <input
        type="radio"
        name="payment"
        value={value}
        checked={selected}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled} // Apply the disabled attribute here
      />
      <span className="payment-label">{label}</span>
    </label>
  );
}

export default PaymentMethod;
